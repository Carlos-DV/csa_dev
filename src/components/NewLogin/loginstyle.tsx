// YourComponent.styles.js
export default `

    @import url('https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@700&family=Figtree:wght@700&display=swap');

  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  .general {
    display: flex;
    width: 100vw;
    height: 100vh;
  }


  .container {
    width: 50%;
    height: 100%;
    background-color: #24242c;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 15px;
  }

  .pic {
    width: 50%;
    height: 100%;
    overflow: hidden;
    background-image: url("https://images.unsplash.com/photo-1690046793177-44d9e1b3de38?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
    background-size: cover;
    background-position: center;
  }

  .inp {
    width: 350px;
    height: 50px;
    display: flex;
    align-items: center;
    position: relative;
  }


  .up {
    left: 20px;
    transform: translateY(-22px);
    font-size: 12px;
    background-color: #24242c;
  }

  .dbutton {
    background: linear-gradient(45deg, rgb(16, 137, 211) 0%, rgb(18, 177, 209) 100%);
    box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 20px 10px -15px;
    border-radius: 30px;
    outline: none;
    transition: all 0.2s ease-in-out;
    color: white;
    border: none;
    font-size: 15px;
    font-weight: bold;
    cursor: pointer;
    font-family: 'Figtree', sans-serif;
  }

  .dbutton:hover {
    transform: scale(1.03);
    box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 23px 10px -20px;
  }

  h1 {
    font-family: 'Be Vietnam Pro', sans-serif;
    font-family: 'Figtree', sans-serif;
    color: white;
    margin-bottom: 20px;
  }

  a {
    color: #bbbbbb;
    text-decoration: none;
    font-size: 12px;
    font-family: 'Figtree', sans-serif;
  }

  a:hover {
    text-decoration: underline;
  }

  }

  @media only screen and (max-width: 750px) {
    .pic {
      display: none;
    }

    .container {
      width: 100%;
    }
  }
`;
