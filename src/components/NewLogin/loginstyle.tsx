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
    background-image: url("https://4kwallpapers.com/images/wallpapers/dark-blue-pink-2560x2560-12661.jpg");
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
    background-color: #2020db;
    border: 2px solid #1f1fff;
    border-radius: 50px;
    outline: none;
    transition: .4s;
    color: #fff;

    font-size: 15px;
    cursor: pointer;
    font-family: 'Figtree', sans-serif;
  }

  .dbutton:hover {
    background-color: #1717c2;
    border: 2px solid #1717c2;
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
