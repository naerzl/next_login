import phoneInput from './phoneInput'

export default function UsePassword(onContinue: () => void) {
    return (
        <>
            {phoneInput()}
            <input className="mt-4 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                        focus:outline-none focus:border- focus:ring-1 focus:ring-railway_blue
                        disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                        invalid:border-pink-500 invalid:text-pink-600
                        focus:invalid:border-pink-500 focus:invalid:ring-pink-500" type="password" placeholder="密码" />
            <div className="px-1 text-xs text-gray-500 py-2">继续，即代表您同意我们的<span className="cursor-pointer text-railway_blue">服务条款</span>和<span className="cursor-pointer text-railway_blue">隐私协议</span></div>
            <button className="flex flex-row justify-center bg-railway_blue rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white focus:outline-none shadow-sm" onClick={onContinue}>
                <svg className="motion-reduce:hidden animate-spin w-4 text-white mt-1 mx-2" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                            strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                继续
            </button>
        </>
    )
}