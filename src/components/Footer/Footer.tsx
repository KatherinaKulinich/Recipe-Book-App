import { SiGithub } from 'react-icons/Si'
import { FaLinkedin } from 'react-icons/Fa'
import { SiGmail } from 'react-icons/Si'
import { Logo } from '../Logo/Logo'
import { useContext } from 'react'
import { ThemeContext } from '../../ThemeProvider'



export const Footer: React.FC = () => {
    const { theme } = useContext(ThemeContext);


    return (
        <div className={`footer ${
            theme === 'dark' ? 'footer--dark' : 'footer--light'
        }`}>
            <div className='footer__main'>
                <Logo/>
                <div className='footer__socials'>
                    <a 
                        href='https://github.com/KatherinaKulinich' 
                        className='footer__social-item'
                        target={'_blank'}
                    >
                        <SiGithub/>
                    </a>
                    <a 
                        href='https://www.linkedin.com/in/kateryna-kulinich-31672025a/' 
                        className='footer__social-item'
                        target={'_blank'}
                    >
                        <FaLinkedin/>
                    </a>
                    <a 
                        href="mailto:kulinichcatherina@gmail.com" 
                        className='footer__social-item'
                        target={'_blank'}
                    >
                        <SiGmail/>
                    </a>
                </div>
            </div>
            <div className='footer__copyright'>
                <p className='footer__text'>
                    &copy; {new Date().getFullYear()} All rights reserved
                </p>
                <p className='footer__text'>
                    Created by Kateryna Kulinich
                </p>
            </div>
        </div>
    )
}