import { usePassword } from './hooks/usePassword'
import { TypeSelection } from './components/TypeSelection'
import { PasswordForm } from './components/PasswordForm'

function App() {
  const { input, setInput, submit, reset, authenticated, error } = usePassword('Gorillasix1!')

  return (
    <div className="min-h-screen bg-gray-100 p-10 flex items-center justify-center w-full">
      {authenticated ? (
        <TypeSelection />
      ) : (
        <PasswordForm input={input} setInput={setInput} submit={submit} />
      )}
    </div>
  )
}

export default App
