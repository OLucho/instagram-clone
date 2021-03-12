import styled from 'styled-components';

export const Container = styled.div`
  max-width: 900px;
  max-height: 700px;
  width: 100%;
  height: 100%;
  padding-top: 100px;
  margin: 0 auto;
  display: flex;
`;
export const ContainerPhoto = styled.div`
  background-color: #f6f6f6;
  width: 100%;
  max-width: 600px;
  max-height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #e6e6e6;
  border-radius: 5px;
`;
export const ContainerPost = styled.div`
  width: 100%;
  max-width: 300px;
  background: white;
`;

export const HeaderPost = styled.div`
  padding: 10px 16px;
  font: 400 14px 'Roboto';
  border-bottom: 1px solid #e6e6e6;
  p {
    font: 14px 'Roboto';
    margin-top: 5px;
  }
`;

export const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
`;

export const ContainerComments = styled(HeaderPost)`
  max-height: 400px;
  overflow: auto;
`;

export const TimeStyle = styled.span`
  color: #999999;
  font-size: 10px;
  letter-spacing: 0.2px;
  text-transform: uppercase;
`;

export const ContainerComment = styled.div`
  max-height: 400px;
  min-height: 400px;
  overflow: auto;
`;
export const ContainerOptions = styled(HeaderPost)`
  color: indianred;
`;
