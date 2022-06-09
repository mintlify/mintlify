const rolesOptions = [
  { id: 'founder', title: 'Founder' },
  { id: 'executive', title: 'Executive' },
  { id: 'em', title: 'Engineering Manager' },
  { id: 'pm', title: 'Product Manager' },
  { id: 'engineer', title: 'Engineer' },
  { id: 'tw', title: 'Technical Writer' },
  { id: 'other', title: 'Other' },
]

const sizeOptions = [
  { id: '1', title: 'Individual' },
  { id: '2-5', title: '2 - 10' },
  { id: '11-50', title: '11 - 50' },
  { id: '51-200', title: '51 - 200' },
  { id: '200+', title: '200+' },
]

const appsOptions = [
  { id: 'github', title: 'GitHub' },
  { id: 'vscode', title: 'VS Code' },
  { id: 'slack', title: 'Slack' },
  { id: 'none', title: 'None of the above' },
]

export default function Onboarding() {
  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-8">
        <div className="max-w-3xl mx-auto py-12">
          <h1 className="text-3xl font-semibold">
            Welcome <span className="text-primary">Han</span> 👋
          </h1>
          <p className="mt-1 text-gray-600">
            First things first, tell us about yourself
          </p>
          <div className="mt-4 flex space-x-2">
            {
             [0, 1, 2, 3].map((i) => (
                <span key={i} className="h-1 w-14 bg-slate-200 rounded-sm"></span>
              ))
            }
          </div>
          <div className="mt-6 space-y-8">
            <div>
              <label className="text-base font-medium text-gray-900">What best describes what you do?</label>
              <fieldset className="mt-4">
                <div className="w-96 max-w-full grid grid-cols-2 gap-4">
                  {rolesOptions.map((roleOption) => (
                    <div key={roleOption.id} className="flex items-center">
                      <input
                        id={roleOption.id}
                        name="notification-method"
                        type="radio"
                        defaultChecked={roleOption.id === 'email'}
                        className="focus:ring-0 h-4 w-4 text-primary border-gray-300"
                      />
                      <label htmlFor={roleOption.id} className="ml-3 block text-sm text-gray-700">
                        {roleOption.title}
                      </label>
                    </div>
                  ))}
                </div>
              </fieldset>
            </div>
            <div>
              <label className="text-base font-medium text-gray-900">How big is your team?</label>
              <fieldset className="mt-4">
                <div className="w-96 max-w-full grid grid-cols-2 gap-4">
                  {sizeOptions.map((sizeOption) => (
                    <div key={sizeOption.id} className="flex items-center">
                      <input
                        id={sizeOption.id}
                        name="notification-method"
                        type="radio"
                        defaultChecked={sizeOption.id === 'email'}
                        className="focus:ring-0 h-4 w-4 text-primary border-gray-300"
                      />
                      <label htmlFor={sizeOption.id} className="ml-3 block text-sm text-gray-700">
                        {sizeOption.title}
                      </label>
                    </div>
                  ))}
                </div>
              </fieldset>
            </div>
            <div>
              <label className="text-base font-medium text-gray-900">Which of the following do you or your team use?</label>
              <p className="text-sm leading-5 text-gray-500">Check all that apply</p>
              <fieldset className="mt-4">
                <div className="w-96 max-w-full grid grid-cols-2 gap-4">
                  {appsOptions.map((appOption) => (
                    <div key={appOption.id} className="flex items-center">
                      <input
                        id={appOption.id}
                        name="role-option"
                        type="checkbox"
                        defaultChecked={appOption.id === 'email'}
                        className="focus:ring-0 h-4 w-4 text-primary border-gray-300"
                      />
                      <label htmlFor={appOption.id} className="ml-3 block text-sm text-gray-700">
                        {appOption.title}
                      </label>
                    </div>
                  ))}
                </div>
              </fieldset>
            </div>
            <div>
              <button className="mt-4 bg-primary hover:bg-hover py-1 px-6 rounded-sm text-white">Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}