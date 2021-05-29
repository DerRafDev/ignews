import { render, screen } from '@testing-library/react'
import { ActiveLink } from '../../components/ActiveLink'

jest.mock('next/router', () => {
    return {
        useRouter() {
            return {
                asPath: '/'
            }
        }
    }
})

describe('ActiveLink component', () => {
    it('renders correctly', () => {
        render(
            <ActiveLink href="/" activeClassName="active">
                <a>Home</a>
            </ActiveLink>
        )
    
        //this is to expect the home link
        expect(screen.getByText('Home')).toBeInTheDocument()
    })
    
    it('adds active class if the link is currently active', () => {
        const { getByText } = render(
            <ActiveLink href="/" activeClassName="active">
                <a>Home</a>
            </ActiveLink>
        )
    
        //this is to expect the home link
        expect(getByText('Home')).toHaveClass('active')
    })
})