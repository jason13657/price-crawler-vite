type Props = {
  input: string
  setInput: (input: string) => void
  submit: () => void
}

export function PasswordForm({ input, setInput, submit }: Props) {
  return (
    <div className="flex gap-2">
      <p>Enter Password : </p>
      <input
        className="bg-amber-50"
        type="password"
        value={input}
        onChange={(e) => {
          setInput(e.target.value)
        }}
      />
      <button
        className="bg-slate-50 px-2"
        onClick={() => {
          submit()
        }}
      >
        Submit
      </button>
    </div>
  )
}
