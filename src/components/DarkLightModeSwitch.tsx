import type { Dispatch, SetStateAction } from 'react';
import moon from '../assets/images/moon.png'
import sun from '../assets/images/sun.png'
import '../styles/components/DarkLightModeSwitch.css'

interface HeaderProps {
  mode: string;
  setMode: Dispatch<SetStateAction<string>>;
}

export default function DarkLightModeSwitch(props: HeaderProps) {
    return (
        <button className="mode-switch" onClick={() => props.setMode((prevMode: string) => (prevMode === 'light' ? 'dark' : 'light'))}>
            <img src={props.mode === 'light' ? moon: sun} alt="Toggle Dark/Light Mode" />
        </button>
    )
}