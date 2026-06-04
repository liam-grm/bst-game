function GenerationInfo({ generationProp }) {
  if (generationProp == null) {
    return null;
  }

  return (
    <p className="generation-text">
      Introduced: Generation {generationProp}
    </p>
  );
}

export default GenerationInfo;
