export default function ErrorPage() {
  return (
    <section className="bg-rd-white flex min-h-screen w-full items-center justify-center">
      <div className="gap-rd-24 flex max-w-[420px] flex-col text-center">
        <div className="gap-rd-8 flex flex-col">
          <h1 className="text-rd-fs-title-main text-rd-surface-gray-600 font-semibold">
            화면을 불러오지 못했어요
          </h1>
          <p className="text-rd-fs-normal text-rd-surface-gray-400 leading-5">
            잠시 후 다시 시도하거나 화면을 새로고침해 주세요.
          </p>
        </div>
      </div>
    </section>
  );
}
