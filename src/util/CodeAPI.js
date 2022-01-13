import { useEffect, useState } from "react"
import getRandomId from "./RandomID"

const STORENAME = "codend"

export const getCode = (codeId, key) => {
  const data = getData()

  return data.find((code) => code.id === codeId)[key]
}

export const saveCode = (codeId, key, newValue) => {
  const data = getData()

  let codeIndex = data.findIndex((code) => code.id === codeId)

  data[codeIndex][key] = newValue

  localStorage.setItem(STORENAME, JSON.stringify(data))
}

export const getData = () => {
  let data

  if (localStorage.getItem(STORENAME)) {
    data = JSON.parse(localStorage.getItem(STORENAME))
    return data
  } else {
    localStorage.setItem(STORENAME, JSON.stringify([]))

    data = JSON.parse(localStorage.getItem(STORENAME))
    return data
  }
}

export const getTitle = (codeId) => {
  const codeIndex = getData().findIndex((code) => code.id === codeId)

  return getData()[codeIndex]["title"]
}

export const createCode = (title) => {
  let data = getData()

  data.push({
    id: getRandomId(),
    title: title,
    html: "<!-- Start Coding... -->",
    css: "/* Start Coding.... */",
    js: "/* Start Coding.... */",
  })

  localStorage.setItem(STORENAME, JSON.stringify(data))
}

export const deleteCode = (codeId) => {
  let data = getData()

  data = data.filter((code) => code.id !== codeId)

  localStorage.setItem(STORENAME, JSON.stringify(data))
}

// API HOOKS

export const useCodePage = (initialValue) => {
  const [codePage, setCodePage] = useState(() => {
    if (localStorage.getItem(`${STORENAME}page`) !== null) {
      return localStorage.getItem(`${STORENAME}page`) === "true" ? true : false
    } else {
      return false
    }
  })

  useEffect(() => {
    localStorage.setItem(`${STORENAME}page`, codePage)
  }, [codePage])

  return [codePage, setCodePage]
}

export const useCurrentCode = (initialValue) => {
  const [currentCode, setcurrentCode] = useState(() => {
    if (localStorage.getItem(`${STORENAME}current`) !== null) {
      return localStorage.getItem(`${STORENAME}current`)
    }

    if (typeof initialValue === "function") {
      return initialValue()
    } else {
      return initialValue
    }
  })

  useEffect(() => {
    localStorage.setItem(`${STORENAME}current`, currentCode)
  }, [currentCode])

  return [currentCode, setcurrentCode]
}
