import Createtodo from './components/Createtodo';
import Todolist from './components/Todolist';

export default function Home() {
  return (
    <div
      className='flex items-center justify-center h-screen bg-zinc-950'
      style={{
        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke-width='2' stroke='%2318181b'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`,
      }}
    >
      <div className='mb-6 w-full flex flex-col items-center text-white'>
        <h1 className='text-xl font-medium'>Good morning! ☀️</h1>
        <p className='text-zinc-400'>Let`s see what we`ve got to do today.</p>
        <Createtodo />
        <div className='mt-5'>
          <Todolist />
        </div>
      </div>
    </div>
  );
}
