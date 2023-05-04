const SignupRepository = require('../repositories/signup.repository.js');

class SignupService {
  signupRepository = new SignupRepository();

  signup = async (nickname, password, confirm) => {
    const nickPattern = new RegExp('^[a-zA-Z0-9]{3,12}$');
  
    if (!nickPattern.test(nickname)) {
      throw new Error('닉네임의 형식이 일치하지 않습니다.');
    };
  
    if (password !== confirm) {
      throw new Error('패스워드가 일치 하지 않습니다.');
    };
  
    if (password.length < 4) {
      throw new Error('패스워드 형식이 올바르지 않습니다.');
    };
  
    const passwordPattern = new RegExp(`^[^${nickname}]{4,13}$`);
    if (!passwordPattern.test(password)) {
      throw new Error('패스워드에 닉네임이 포함되어 있습니다.');
    };
  
    const existsUsers = await this.signupRepository.findUserByNickname(nickname);
    if (existsUsers !== null) {
      throw new Error('중복된 닉네임입니다.');
    };
  
    await this.signupRepository.createUser({ nickname, password });
    return '회원가입에 성공하였습니다.';
  };
};

module.exports = SignupService;
