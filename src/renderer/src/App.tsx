import { usePassword } from './hooks/usePassword'
import { TypeSelection } from './components/TypeSelection'
import { PasswordForm } from './components/PasswordForm'

function App() {
  const { input, setInput, submit, authenticated } = usePassword('Gorillasix1!')

  return (
    <div className="relative min-h-screen bg-gray-100 p-10 flex flex-col items-center justify-center w-full">
      <div className="absolute top-3 right-3">
        <p>v1.0.4</p>
      </div>
      {authenticated ? (
        <TypeSelection />
      ) : (
        <PasswordForm input={input} setInput={setInput} submit={submit} />
      )}
    </div>
  )
}

export default App
