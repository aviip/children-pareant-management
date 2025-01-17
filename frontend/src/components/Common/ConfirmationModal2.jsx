import IconBtn from "./IconBtn"

export default function ConfirmationModal({ modalData }) {
  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-20 backdrop-blur-sm">
      <div className="w-11/12 max-w-[350px] rounded-lg border border-richblue-400 bg-blue-5 p-6">
        <p className="text-2xl font-semibold text-richblue-800">
          {modalData?.text1}
        </p>
        <p className="mt-2 mb-5 leading-4 text-richblue-700 opacity-80">
          {modalData?.text2}
        </p>
        <div className="flex items-center gap-x-4">
          <IconBtn
            onclick={modalData?.btn1Handler}
            text={modalData?.btn1Text}
          />
          <button
            className="cursor-pointer rounded-md bg-blu py-[8px] px-[20px] font-semibold text-white"
            onClick={modalData?.btn2Handler}
          >
            {modalData?.btn2Text}
          </button>
        </div>
      </div>
    </div>
  )
}