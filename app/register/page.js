export default function Register() {
  return (
    <div>
      <form method="POST" action="api/auth/signup">
        <input name="name" type="text" placeholder="이름" required />
        <input name="email" type="text" placeholder="이메일" required />
        <input
          name="password"
          type="password"
          placeholder="비밀번호"
          required
        />
        <input
          name="passwordConfirm"
          type="password"
          placeholder="비밀번호 확인"
          required
        />
        <button type="submit">id/pw 가입요청</button>
      </form>
    </div>
  );
}
