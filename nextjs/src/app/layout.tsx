"use client"; // client component로 바꾸고 싶으면
import Link from 'next/link'
import './globals.css'
import type { Metadata } from 'next'
import { useEffect, useState } from 'react'

/*export const metadata: Metadata = {
  title: 'Web tutorials',
  description: 'Generated by HS',
}*/

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [topics, setTopics] = useState([]);
  useEffect(() => {
    fetch('http://localhost:9000/topics')
      .then((resp) => resp.json())
      .then(result => { setTopics(result) });
  }, [])
  return (
    <html>
      <body>
        <h1><a href="/">WEB</a></h1>
        <ol>
          {topics.map((topic:any) => {
            return <li key={topic.id}><Link href={`/read/${topic.id}`}>{topic.title}</Link></li>
          })}
        </ol>
        {children}
        <ul>
          <li><Link href="/create">Create</Link></li>
          <li><Link href="/update/1">Update</Link></li>
          <li><input type="button" value="delete" /></li>
        </ul>
      </body>
    </html>
  )
}
