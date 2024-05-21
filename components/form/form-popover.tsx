"use client";

import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { FormInput } from "./form-input";
import { FormSubmit } from "./form-submit";
import { useAction } from "@/hooks/use-action";
import { createBoard } from "@/actions/create-board";
import { toast } from "sonner";

interface Props {
    children: React.ReactNode;
    side?: "left" | "right" | "top" | "bottom";
    align?: "start" | "center" | "end";
    sideOffset?: number;
}

export const FormPopover = ({
    children,
    side = "bottom",
    align,
    sideOffset = 0
}: Props) => {
    const { execute, fieldErrors } = useAction(createBoard, {
        onSuccess: (data) => {
            console.log({ data })
            toast.success("Board created")
        },
        onError: (error) => {
            console.log({ error })
            toast.error(error)
        }
    })

    const onSubmit = (formData: FormData) => {
        const title = formData.get("title") as string;

        execute({ title })
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                { children }
            </PopoverTrigger>
            <PopoverContent
                align={align}
                className="w-80 pt-3"
                side={side}
                sideOffset={sideOffset}
            >
                <div className="text-sm font-medium text-center text-neutral-600 pb-4">
                    Create board
                </div>
                <PopoverClose asChild>
                    <Button className="w-auto h-auto p-2 absolute top-2 right-2 text-neutral-600 border-none" variant="ghost">
                        <X className="w-4 h-4" />
                    </Button>
                </PopoverClose>
                <form className="space-y-4" action={onSubmit}>
                    <div className="space-y-4">
                        <FormInput
                            id="title"
                            label="Board title"
                            type="text"
                            errors={fieldErrors}
                        />
                        <FormSubmit className="w-full">
                            Create
                        </FormSubmit>
                </div>
                </form>
            </PopoverContent>
        </Popover>
    )
}