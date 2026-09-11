-- ============================================================
-- 迁移：为 admin_action 增加 reorder_icons 动作（拖拽排序用）
-- ============================================================
-- 适用场景：项目已经用旧版 init.sql 建过库。
-- 直接把本文件全部内容粘贴到 Supabase SQL Editor 运行一次即可。
-- 只替换函数定义，不触碰任何数据 / 密码哈希。
-- 新项目直接跑最新版 init.sql 就自带此动作，无需执行本文件。
-- ============================================================

create or replace function public.admin_action(
  password text,
  action   text,
  payload  jsonb
) returns jsonb
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  stored_hash text;
  new_id      uuid;
  result      jsonb;
  item        jsonb;
begin
  select value into stored_hash
    from public.app_settings
   where key = 'admin_password_hash';

  if stored_hash is null
     or encode(digest(coalesce(password,''), 'sha256'), 'hex') <> stored_hash then
    raise exception 'unauthorized' using errcode = '42501';
  end if;

  if action = 'create_category' then
    insert into public.categories(name, slug, is_locked, sort_order)
    values (
      payload->>'name',
      payload->>'slug',
      coalesce((payload->>'is_locked')::boolean, false),
      coalesce((payload->>'sort_order')::int, 0)
    )
    returning id into new_id;
    result := jsonb_build_object('id', new_id);

  elsif action = 'update_category' then
    update public.categories
       set name       = payload->>'name',
           slug       = payload->>'slug',
           is_locked  = coalesce((payload->>'is_locked')::boolean, is_locked),
           sort_order = coalesce((payload->>'sort_order')::int, sort_order)
     where id = (payload->>'id')::uuid;
    result := jsonb_build_object('ok', true);

  elsif action = 'delete_category' then
    delete from public.categories where id = (payload->>'id')::uuid;
    result := jsonb_build_object('ok', true);

  elsif action = 'toggle_lock' then
    update public.categories
       set is_locked = (payload->>'is_locked')::boolean
     where id = (payload->>'id')::uuid;
    result := jsonb_build_object('ok', true);

  elsif action = 'create_icon' then
    insert into public.icons(name, category_id, svg, sort_order)
    values (
      payload->>'name',
      (payload->>'category_id')::uuid,
      payload->>'svg',
      coalesce((payload->>'sort_order')::int, 0)
    )
    returning id into new_id;
    result := jsonb_build_object('id', new_id);

  elsif action = 'update_icon' then
    update public.icons
       set name        = payload->>'name',
           category_id = (payload->>'category_id')::uuid,
           svg         = payload->>'svg',
           sort_order  = coalesce((payload->>'sort_order')::int, sort_order)
     where id = (payload->>'id')::uuid;
    result := jsonb_build_object('ok', true);

  elsif action = 'delete_icon' then
    delete from public.icons where id = (payload->>'id')::uuid;
    result := jsonb_build_object('ok', true);

  elsif action = 'reorder_icons' then
    -- 批量排序：payload.items = [{ id, category_id, sort_order }, ...]
    -- 后台拖拽排序后一次性提交，序号由前端自动生成（组内 0..n-1）
    for item in select * from jsonb_array_elements(payload->'items') loop
      update public.icons
         set category_id = (item->>'category_id')::uuid,
             sort_order  = coalesce((item->>'sort_order')::int, sort_order)
       where id = (item->>'id')::uuid;
    end loop;
    result := jsonb_build_object('ok', true);

  elsif action = 'change_password' then
    -- 修改管理员密码：payload.new_password 传明文，本函数做哈希后入库
    update public.app_settings
       set value = encode(digest(payload->>'new_password', 'sha256'), 'hex'),
           updated_at = now()
     where key = 'admin_password_hash';
    result := jsonb_build_object('ok', true);

  elsif action = 'change_unlock_password' then
    update public.app_settings
       set value = encode(digest(payload->>'new_password', 'sha256'), 'hex'),
           updated_at = now()
     where key = 'unlock_password_hash';
    result := jsonb_build_object('ok', true);

  else
    raise exception 'unknown action: %', action using errcode = '22023';
  end if;

  return coalesce(result, '{"ok": true}'::jsonb);
end;
$$;

-- 允许 anon 角色调用这个 RPC（验证逻辑在函数内部）
grant execute on function public.admin_action(text, text, jsonb) to anon;
