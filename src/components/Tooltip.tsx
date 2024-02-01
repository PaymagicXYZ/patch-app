"use client"
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@radix-ui/react-tooltip"
import { ClipboardIcon } from "lucide-react"
import { Button } from "./ui/button"

export const TooltipCustom = ({text}: {text: string}) => {
    return (
        <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">
              {text}
              <ClipboardIcon className="ml-2 h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Click to copy</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
}