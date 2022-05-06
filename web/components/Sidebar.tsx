import { CogIcon } from '@heroicons/react/outline';
import {
  BadgeCheckIcon,
  PlusIcon,
} from '@heroicons/react/solid'
import { useState } from 'react'
import AddDocumentCommand from './AddDocumentCommand'

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
    <AddDocumentCommand
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    />
    <div className="xl:flex-shrink-0 xl:w-64 xl:border-r xl:border-gray-200">
      <div className="pl-4 pr-6 py-6 sm:pl-6 lg:pl-8 xl:pl-0">
        <div className="flex items-center justify-between">
          <div className="flex-1 space-y-8">
            <div className="space-y-8 sm:space-y-0 sm:flex sm:justify-between sm:items-center xl:block xl:space-y-8">
              {/* Profile */}
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 h-12 w-12">
                  <img
                    className="h-12 w-12 rounded-full"
                    src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&h=256&q=80"
                    alt=""
                  />
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-medium text-gray-900">Debbie Lewis</div>
                  <a href="#" className="group flex items-center space-x-1 group-hover:text-gray-900">
                    <span className="text-sm text-gray-500 font-medium">
                      Mintlify
                    </span>
                  </a>
                </div>
              </div>
              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row xl:flex-col">
                <button
                  type="button"
                  className="inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary xl:w-full"
                  onClick={() => setIsOpen(true)}
                >
                  Add Documentation
                </button>
                <button
                  type="button"
                  className="mt-3 inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:mt-0 sm:ml-3 xl:ml-0 xl:mt-3 xl:w-full"
                >
                  Add Rule
                </button>
              </div>
            </div>
            {/* Meta info */}
            <div className="flex flex-col space-y-6 sm:flex-row sm:space-y-0 sm:space-x-8 xl:flex-col xl:space-x-0 xl:space-y-6">
              <div className="flex items-center space-x-2">
                <PlusIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                <span className="text-sm text-gray-500 font-medium">Invite team member</span>
              </div>
              <div className="flex items-center space-x-2">
                <CogIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                <span className="text-sm text-gray-500 font-medium">Settings</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}