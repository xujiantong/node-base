import NotFound from '@/assets/imgs/404/not-found.svg';

export default function index() {
  return (
    <div className={'w-full h-full flex flex-col justify-center items-center'}>
      <img src={NotFound} width={200} alt={'not found'} />
      <span>页面找不到了...</span>
    </div>
  );
}
