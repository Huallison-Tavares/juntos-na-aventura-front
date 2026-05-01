interface TitleProps {
    title: string,
    description: string
}

export function Title({
    title,
    description
}: TitleProps) {
    return (
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900">
                {title}
            </h2>
            <p className="mt-2 text-center text-sm text-slate-600">
                {description}
            </p>
        </div>
    )
}