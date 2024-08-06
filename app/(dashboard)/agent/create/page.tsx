"use client"
import React, { useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import Behavior from './Behavior'
import Config from './Config'

const Page = () => {
  const [currentTab, setCurrentTab] = useState(0)
  const tabs = [
    { title: "Agent Behavior", description: "Select your agent behavior" },
    { title: "Agent Config", description: "Configure your agent" },
    { title: "Embed Agent", description: "Get calls and prospects" }
  ]

  const methods = useForm()
  const [behavior, setBehavior] = useState('Support Agent')

  const handleNext = () => {
    if (currentTab < tabs.length - 1) {
      setCurrentTab(currentTab + 1)
    }
  }

  const handlePrev = () => {
    if (currentTab > 0) {
      setCurrentTab(currentTab - 1)
    }
  }

  const onSubmit = (data) => {
    alert(`Submitted! Data: ${JSON.stringify(data)}`)
  }

  return (
    <div className='p-5 min-h-screen rounded'>
      <div className="bg-white mt-4 rounded p-4 min-h-[600px] shadow-lg">
        <div className='w-full flex flex-col md:flex-row gap-y-3 px-2 md:px-12 py-3 justify-between'>
          {tabs.map((tab, index) => (
            <div key={index} className='flex gap-4 items-center'>
              <div className={`w-[60px] h-[60px] flex items-center justify-center font-bold rounded-full text-2xl ${currentTab === index ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>{index + 1}</div>
              <div className='text-left'>
                <h3 className='font-medium text-xl text-gray-900'>{tab.title}</h3>
                <p className='text-sm text-gray-600'>{tab.description}</p>
              </div>
            </div>
          ))}
        </div>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <div className='mt-4 px-2 md:px-12'>
              {currentTab === 0 && <Behavior behavior={behavior} setBehavior={setBehavior} />}
              {currentTab === 1 && <Config form={methods} />}
              {currentTab === 2 && <div>Content for Embed Agent</div>}
            </div>
            <div className='flex justify-end mt-4 gap-4 px-2 md:px-12'>
              <button type="button" onClick={handlePrev} disabled={currentTab === 0} className='px-4 py-2 bg-gray-200 rounded disabled:opacity-50'>Previous</button>
              {currentTab < tabs.length - 1 && <button type="button" onClick={handleNext} className='px-4 py-2 bg-blue-600 text-white rounded'>Next</button>}
              {currentTab === tabs.length - 1 && <button type="submit" className='px-4 py-2 bg-blue-600 text-white rounded'>Submit</button>}
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  )
}

export default Page
