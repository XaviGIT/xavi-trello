"use client";

import { Input } from "@/components/ui/input";
import { useFormStatus } from "react-dom";

interface Props {
    errors?: {
        title?: string[]
    }
}

export const FormInput = ({ errors }: Props) => {
    const { pending } = useFormStatus();

    return (
        <div className="flex flex-col space-y-2">
            <Input
                id="title"
                name="title"
                required
                placeholder="Enter a board title"
                disabled={pending}
            />
            {errors?.title && (
                <div>
                    {errors.title.map((error: string) => (
                        <p key={error} className="text-rose-500">{error}</p>
                    ))}
                </div>
            )}
        </div>
    )
}