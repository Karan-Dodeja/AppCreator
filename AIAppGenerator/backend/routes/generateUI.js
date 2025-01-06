const fs = require('fs-extra');
const path = require('path');

const generateComponent = (feature) => {
  if (feature === 'TaskList') {
    return `
      import React from 'react';
      import { FlatList, Text, View } from 'react-native';

      const TaskList = ({ tasks }) => (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View>
              <Text>{item.name}</Text>
            </View>
          )}
        />
      );

      export default TaskList;
    `;
  }
  return '';
};

const saveComponent = async (feature) => {
  const componentCode = generateComponent(feature);
  const outputPath = path.resolve(__dirname, `../../generated/${feature}.js`);
  await fs.outputFile(outputPath, componentCode);
};

module.exports = saveComponent;
