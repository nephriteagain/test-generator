"use client"
import { useReducer, Dispatch, useEffect, useState } from "react"
import Reducer from './reducers/testReducer'
import { test } from "./types"
import { TestHistory } from "./History"

import Main from "./Main"
import Side from "./Side"

const initial : test = {
  subject : '',
  author : '',
  units: []
}
// TODO add history at onchange events
export const History = new TestHistory<test>(100)



export default function Home() {
  const [test, dispatch] = useReducer(Reducer, initial)



  return (
    <main className="mx-8">
      <div className="flex justify-center gap-4">        
        <Main 
          test={test}
          dispatch={dispatch}
        />
        <Side />
      </div>
      
    </main>
  )
}
