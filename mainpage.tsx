'use client'

import { useState, useEffect, useRef, KeyboardEvent } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, Terminal, Lock, MessageSquare, Shield, AlertTriangle } from "lucide-react"
import Link from 'next/link'

const hebrewAlphabet = 'אבגדהוזחטיכלמנסעפצקרשת'
const russianAlphabet = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя'
const englishAlphabet = 'abcdefghijklmnopqrstuvwxyz'

const generateCipher = (text: string) => {
  return text.split('').map(char => {
    const alphabets = [hebrewAlphabet, russianAlphabet, englishAlphabet]
    const randomAlphabet = alphabets[Math.floor(Math.random() * alphabets.length)]
    const index = randomAlphabet.indexOf(char.toLowerCase())
    if (index === -1) return char
    return randomAlphabet[(index + 3) % randomAlphabet.length]
  }).join('')
}

const generateCrypticMessage = () => {
  const messages = [
    "The key to the digital labyrinth",
    "Crack the code and win the treasure",
    "Secrets hidden in reality",
    "The path to digital enlightenment",
    "Your mind is the gateway to the prize"
  ]
  return generateCipher(messages[Math.floor(Math.random() * messages.length)])
}

export default function Component() {
  const [text, setText] = useState('')
  const [command, setCommand] = useState('')
  const [inputCommand, setInputCommand] = useState('')
  const [output, setOutput] = useState<string[]>([])
  const [crypticInput, setCrypticInput] = useState('')
  const [crypticOutput, setCrypticOutput] = useState<string[]>([])
  const [showSecretButton, setShowSecretButton] = useState(false)
  const [decryptClicked, setDecryptClicked] = useState(false)
  const [commandCount, setCommandCount] = useState(0)
  const [secretUrl, setSecretUrl] = useState('')
  const [isBlinking, setIsBlinking] = useState(true)
  const outputRef = useRef<HTMLDivElement>(null)
  const crypticOutputRef = useRef<HTMLDivElement>(null)

  const fullText = "DEFCON Cipher Bot - Initialized"
  const redirectUrl = "https://defcon-cipher-redirect.example.com/"
  const fullSecretUrl = "https://secret.defcon-cipher.example.com"

  useEffect(() => {
    if (text.length < fullText.length) {
      const timeoutId = setTimeout(() => {
        setText(generateCipher(fullText.slice(0, text.length + 1)))
      }, 100)

      return () => clearTimeout(timeoutId)
    }
  }, [text])

  useEffect(() => {
    if (showSecretButton && secretUrl.length < fullSecretUrl.length) {
      const timeoutId = setTimeout(() => {
        setSecretUrl(generateCipher(fullSecretUrl.slice(0, secretUrl.length + 1)))
      }, 50)

      return () => clearTimeout(timeoutId)
    }
  }, [secretUrl, showSecretButton])

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(prev => !prev)
    }, 1000)

    return () => clearInterval(blinkInterval)
  }, [])

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight
    }
    if (crypticOutputRef.current) {
      crypticOutputRef.current.scrollTop = crypticOutputRef.current.scrollHeight
    }
  }, [output, crypticOutput])

  const handleCommand = (cmd: string) => {
    setCommand(cmd)
    let response = ''
    switch (cmd.toLowerCase()) {
      case 'decrypt':
        response = generateCipher('Decryption process initiated. Stand by...')
        setDecryptClicked(true)
        break
      case 'access':
        response = generateCipher('Access denied. Higher clearance required.')
        break
      case 'input1337':
        response = generateCipher('Awaiting "1337" solution input. Proceed with caution.')
        break
      case '1337':
        response = generateCipher('DEFCON Cipher Bot detected. Initiating secure protocol...')
        setShowSecretButton(true)
        break
      default:
        response = generateCipher('Unknown command. Try again.')
    }
    setOutput(prev => [...prev, `> ${cmd}`, response])
    setCommandCount(prev => prev + 1)
  }

  const handleInputCommand = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(inputCommand)
      setInputCommand('')
    }
  }

  const handleCrypticInput = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setCrypticOutput(prev => [...prev, `> ${crypticInput}`, generateCrypticMessage()])
      setCrypticInput('')
      setCommandCount(prev => prev + 1)
    }
  }

  return (
    <div className="min-h-screen bg-black text-red-500 p-8 font-mono flex flex-col">
      <header className="text-2xl mb-8 flex flex-col items-center">
        <div className="flex items-center mb-4">
          <Terminal className="mr-2" />
          <span className="opacity-100">{'>'}</span>
        </div>
        <p className="text-xl">{text}</p>
        <div className={`mt-4 text-4xl font-bold flex items-center ${isBlinking ? 'text-red-500' : 'text-transparent'} transition-colors duration-300`}>
          <AlertTriangle className="mr-2" />
          23:59 UTC
        </div>
      </header>

      <main className="flex-grow flex flex-col">
        <Card className="mb-8 bg-gray-900 border-red-500">
          <CardHeader>
            <CardTitle className="text-red-500 flex items-center">
              <Shield className="mr-2" />
              {generateCipher("DEFCON Warning")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-bold text-red-500">
              {generateCipher("Critical alert. Solve the cipher immediately.")}
            </p>
          </CardContent>
        </Card>

        <div className="space-y-4 mb-8">
          {decryptClicked ? (
            <Link href={redirectUrl} passHref>
              <Button 
                variant="outline" 
                className="w-full border-red-500 text-red-500 bg-gray-900 hover:bg-red-500 hover:text-black transition-colors duration-300 flex items-center justify-center"
              >
                <Lock className="mr-2" /> {generateCipher("Decryption in Progress")}
              </Button>
            </Link>
          ) : (
            <Button 
              variant="outline" 
              className="w-full border-red-500 text-red-500 bg-gray-900 hover:bg-red-500 hover:text-black transition-colors duration-300 flex items-center justify-center"
              onClick={() => handleCommand('decrypt')}
            >
              <Lock className="mr-2" /> {generateCipher("Decrypt Files")}
            </Button>
          )}
          <Button 
            variant="outline" 
            className="w-full border-red-500 text-red-500 bg-gray-900 hover:bg-red-500 hover:text-black transition-colors duration-300 flex items-center justify-center"
            onClick={() => handleCommand('access')}
          >
            <AlertCircle className="mr-2" /> {generateCipher("Access Mainframe")}
          </Button>
          <Button 
            variant="outline" 
            className="w-full border-red-500 text-red-500 bg-gray-900 hover:bg-red-500 hover:text-black transition-colors duration-300 flex items-center justify-center"
            onClick={() => handleCommand('input1337')}
          >
            <Terminal className="mr-2" /> {generateCipher('Input "1337" Answer')}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <Card className="bg-gray-900 border-red-500">
            <CardHeader>
              <CardTitle className="text-red-500">{generateCipher("Command Output")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div 
                ref={outputRef}
                className="h-64 overflow-y-auto mb-4 rounded"
              >
                {output.map((line, index) => (
                  <p key={index} className={index % 2 === 0 ? 'text-red-500' : 'text-red-400'}>
                    {line}
                  </p>
                ))}
              </div>

              <div className="flex items-center">
                <span className="mr-2">{'>'}</span>
                <Input
                  type="text"
                  value={inputCommand}
                  onChange={(e) => setInputCommand(e.target.value)}
                  onKeyDown={handleInputCommand}
                  className="bg-gray-800 border-red-500 text-red-500 focus:ring-red-500"
                  placeholder={generateCipher("Enter command...")}
                />
              </div>

              {showSecretButton && (
                <div className="mt-4">
                  <Link href={fullSecretUrl} target="_blank" rel="noopener noreferrer">
                    <Button 
                      variant="outline" 
                      className="w-full border-red-500 text-red-500 bg-gray-900 hover:bg-red-500 hover:text-black transition-colors duration-300 flex items-center justify-center"
                    >
                      {secretUrl || generateCipher("Connecting...")}
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-red-500">
            <CardHeader>
              <CardTitle className="text-red-500">{generateCipher("Cipher Center")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div 
                ref={crypticOutputRef}
                className="h-64 overflow-y-auto mb-4 rounded"
              >
                {crypticOutput.map((line, index) => (
                  <p key={index} className={index % 2 === 0 ? 'text-red-500' : 'text-red-400'}>
                    {line}
                  </p>
                ))}
              </div>

              <div className="flex items-center">
                <MessageSquare className="mr-2" />
                <Input
                  type="text"
                  value={crypticInput}
                  onChange={(e) => setCrypticInput(e.target.value)}
                  onKeyDown={handleCrypticInput}
                  className="bg-gray-800 border-red-500 text-red-500 focus:ring-red-500"
                  placeholder={generateCipher("Enter cipher...")}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-8">
          {[...Array(9)].map((_, index) => (
            <div
              key={index}
              className="h-24 border border-red-500 rounded flex items-center justify-center bg-gray-900"
            >
              <span className="text-2xl text-red-500">
                {generateCipher(String.fromCharCode(65 + index))}
              </span>
            </div>
          ))}
        </div>

        <Card className="mt-8 bg-gray-900 border-red-500">
          <CardContent className="p-4">
            <p className="text-red-500">{generateCipher("The key to enlightenment lies within the shadows of the digital realm.")}</p>
          </CardContent>
        </Card>

        <footer className="mt-8 text-sm text-red-400 flex justify-between items-center">
          <p>{generateCipher("System version: 23.11.X - Truth lies in the patterns. DEFCON Cipher Bot 2.0")}</p>
        </footer>
        <div className="mt-4 text-center">
          <Link href="https://sigma3301.v0.build/" className="text-pink-500 hover:text-pink-400 transition-colors">
            sigma3301
          </Link>
        </div>
      </main>
    </div>
  )
}
