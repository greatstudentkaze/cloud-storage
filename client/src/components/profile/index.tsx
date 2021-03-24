import React, { ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';

import { deleteAvatar, uploadAvatar } from '../../redux/actions/user';

const Profile = () => {
  const dispatch = useDispatch();

  const handleDeleteClick = () => {
    dispatch(deleteAvatar());
  };

  const handleUploadAvatarChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { files } = evt.target;

    if (files) {
      const avatar = files[0];
      dispatch(uploadAvatar(avatar));
    }
  };

  return (
    <div>
      <button type="button" onClick={handleDeleteClick}>Удалить аватарку</button>
      <input type="file" placeholder="Загрузить аватар" onChange={handleUploadAvatarChange} accept="image/*" />
    </div>
  );
};

export default Profile;
