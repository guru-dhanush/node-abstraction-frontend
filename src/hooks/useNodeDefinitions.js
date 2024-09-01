import { useCallback } from "react";

export function useNodeDefinitions(setNodeDefinitions) {
  const handleAddNodeDefinition = useCallback((newNodeDefinition) => {
    setNodeDefinitions((prevDefinitions) => {
      const typeExists = prevDefinitions.some(
        (def) => def.type === newNodeDefinition.type
      );

      if (typeExists) {
        return prevDefinitions.map((def) =>
          def.type === newNodeDefinition.type ? newNodeDefinition : def
        );
      } else {
        return [...prevDefinitions, newNodeDefinition];
      }
    });
  }, []);

  return handleAddNodeDefinition;
}
