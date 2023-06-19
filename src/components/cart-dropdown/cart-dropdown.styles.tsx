import styled from 'styled-components';

export const CartDropdownContainer = styled.div`
  position: absolute;
  width: auto;
  min-width: 25%;
  height: 40%;
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  padding: 20px;
  border: 1px solid black;
  background-color: white;
  top: 90px;
  right: 40px;
  z-index: 5;

  button {
    margin-top: auto;
  }
`;

export const EmptyMessage = styled.span`
  font-size: 18px;
  margin: 50px auto;
`;

export const CartItems = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  overflow: scroll;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer*/
  &::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }
`;
