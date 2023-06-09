import{ Plus, X} from 'phosphor-react';
import * as Dialog from '@radix-ui/react-dialog';

import logoImage from '../assets/logo.svg'
import { NewHabitForm } from './NewHabitForm';

export function Header () {

  
return (
    <div className="w-full max-w-4xl mx-auto flex items-center justify-between gap-3">
    <img src={logoImage} alt="logo Hábitos" />

    <Dialog.Root>
      <Dialog.Trigger type="button"
        className="border border-pink-500 font-semibold rounded-lg px-6 py-4 flex items-center gap-3 hover:border-pink-300"> 
       
      <Plus size={20} className="text-pink-300"/>
        Novo hábito
      </Dialog.Trigger>

      {/* O portal faz o modal aparecer "por cima da tela", fora do Header. Overlay é o blur q fica por trás do modal */}
      <Dialog.Portal>
        <Dialog.Overlay className="w-screen h-screen bg-black/80 fixed inser-0"/>
        
        <Dialog.Content className="absolute border border-pink-500 p-10 bg-zinc-900 rounded-2xl w-full max-w-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
         <Dialog.Close className='absolute right-6 top-6 text-zinc-400 hover:text-zinc-200'>
          <X size={24} aria-label="Fechar"/>
         </Dialog.Close>
          
          <Dialog.Title className='text-3xl leading-tight font-extrabold'>
            Criar Hábito
          </Dialog.Title>

          <NewHabitForm/>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root> 
</div>
)
}