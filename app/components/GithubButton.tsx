import React from 'react';
import { Button } from '~/components/nativewindui/Button';
import { Text } from 'react-native';

type GithubButtonProps = {
  onPress?: () => void;
};

const GithubButton = (props: GithubButtonProps) => {
  return (
    <Button
      className="h-12 w-full flex-row items-center justify-center rounded-lg"
      hoverColor="rgb(48, 48, 43)"
      defaultColor={'rgb(40, 41, 35)'}
      onPress={props.onPress}>
      <Text className="text-base font-medium text-white">Sign in with GitHub</Text>
    </Button>
  );
};

export default GithubButton;
