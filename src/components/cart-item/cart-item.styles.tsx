import styled from 'styled-components';

export const CartItemContainer = styled.div`
  width: 100%;
  display: flex;
  height: 5rem;
  gap: 1rem;

  img {
    width: 25%;
  }
`;

export const ItemButtons = styled.div`
  width: 20%;
  display: flex;
  flex-direction: column;
  row-gap: 0.1rem;
  align-items: center;
  justify-content: space-around;

  button {
    width: 100%;
    flex: 1;
    margin: 0;
    border: none;
    color: #fff;
    background-color: #000;
    border: 1px solid #000;
    &:hover {
      box-sizing: border-box;
      color: #000;
      background-color: #fff;
    }
  }
`;

export const ItemDetails = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .name {
    font-size: 16px;
  }
`;
