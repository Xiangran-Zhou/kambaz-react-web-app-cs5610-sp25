export default function ConditionalOutputIfElse() {
  const loggedIn = true;

  return (
    <div id="wd-conditional-output-if-else">
      {loggedIn ? (
        <h2 id="wd-conditional-output-if-else-welcome">Welcome If Else</h2>
      ) : (
        <h2 id="wd-conditional-output-if-else-login">Please login If Else</h2>
      )}
    </div>
  );
}
