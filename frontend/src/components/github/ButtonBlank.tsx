'use client'
import React from 'react'
import { Button } from '../ui/button';
interface Props {
  url: string;
  children: React.ReactNode;
}
export const ButtonBlank = ({ url, children }:Props) => {
  const handleClick = () => {
    window.open(url, "_blank")
  }
  return (
    <Button onClick={handleClick} >{children}</Button>
  )
}
