import './profile.css';

const user = {
    name: 'Pasindu The Cock Johnson',
    imageUrl: 'https://pbs.twimg.com/profile_images/1422943849685688321/woPceXs8_400x400.jpg',
    imageSize: 90,
  };
  
  export default function Profile() {
    return (
      <>
        <h1>{user.name}</h1>
        <img
          className="avatar"
          src={user.imageUrl}
          alt={'Photo of ' + user.name}
          style={{
            width: user.imageSize,
            height: user.imageSize
          }}
        />
      </>
    );
  }
  