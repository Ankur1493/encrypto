import { Github, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <div className="flex justify-around w-screen py-4  fixed bottom-0 border-t-red-200 border-t">
      <div>
        Created by <a href="https://github.com/ankur1493">Ankur Sharma</a>
      </div>
      <div className="flex w-[10%] justify-around">
        <a href="https://linkedin.com/in/ankursharma14" target="_blank"><Linkedin color="black" /></a>
        <a href="https://github.com/ankur1493" target="_blank"><Github color="black" /></a>
        <a href="https://twitter.com/ankursharma1493" target="_blank"><Twitter color="black" /></a>
      </div>
    </div>
  )
}
