import { HomeOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
import { useEffect, useState } from 'react';
import { redirect, useLocation, useNavigate } from 'react-router';
import useRouterStore from '@/stores/useRouterStore.ts';

export default function McHeaderTabs() {
  const [activeKey, setActiveKey] = useState();
  const { menusFlatMap, updateTabArr, tabArr } = useRouterStore(
    (state) => state
  );
  const onEdit = (
    targetKey: React.MouseEvent | React.KeyboardEvent | string,
    action: 'add' | 'remove'
  ) => {
    if (action === 'remove') {
      console.log(targetKey);
      console.log(tabArr);
      const currentTabsArrs = tabArr.filter(
        (item: any) => item.key !== targetKey
      );
      navigate('/');
      updateTabArr(currentTabsArrs);
    }
  };
  const [items, setItems] = useState([
    {
      icon: <HomeOutlined />,
      key: 'home',
      closable: false
    }
  ]);
  const location = useLocation();
  const navigate = useNavigate();

  const onChange = (v: string) => {
    if (v === 'home') {
      navigate('/');
    } else {
      navigate(v);
    }
  };

  useEffect(() => {
    if (Object.keys(menusFlatMap).length > 0) {
      const pathname = location.pathname || '/';
      // 可以在这里做路由变化相关逻辑
      const route = menusFlatMap[pathname];
      if (route) {
        const uniqueArr = Array.from(
          new Map([...tabArr, route].map((item) => [item?.id, item])).values()
        );
        updateTabArr(uniqueArr);
        window.localStorage.setItem('tabArr', JSON.stringify(uniqueArr));
        setActiveKey(route?.key);
      }
    }
  }, [location, menusFlatMap]);

  return (
    <>
      <Tabs
        hideAdd
        type="editable-card"
        onChange={onChange}
        activeKey={activeKey}
        onEdit={onEdit}
        items={[...items, ...tabArr] as any}
      />
    </>
  );
}
