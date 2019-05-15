export default ($nodeToReplace, $nodeTarget) => {
  $nodeTarget.replaceWith($nodeToReplace);
  return $nodeToReplace;
};
