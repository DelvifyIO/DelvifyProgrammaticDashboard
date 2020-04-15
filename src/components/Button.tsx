import styled from '@emotion/styled'
import { colors } from '../styles/variables'

export default styled.a`
  width: 95%;
  background: ${colors.accent};
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  cursor: pointer;
  font-weight: bold;
  border-radius: 3em;
  padding: 1.25rem;
  &:hover {
    text-decoration: none;
  }
`
