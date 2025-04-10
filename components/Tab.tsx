import { Tabs } from '@tamagui/tabs';
import { View, Text } from '@tamagui/core';
import { AnimatePresence } from '@tamagui/animate-presence';

const tabs = ['trends', 'exchanges']
interface TabProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}
export const Tab = ({ activeTab, setActiveTab }: TabProps) => {
    return (
        <Tabs defaultValue="trends" onValueChange={(value) => setActiveTab(value)} value={activeTab} width="80%">
            <Tabs.List justifyContent="space-between" gap={4}> 
                {
                    tabs.map((tab) => {
                        const isActive = activeTab === tab;
                        return (
                            <Tabs.Tab value={tab} key={tab} paddingVertical={8} paddingHorizontal={4}>
                                <AnimatePresence>
                                    <View 
                                        alignItems="flex-start"
                                        key={tab}
                                        enterStyle={{
                                            opacity: 0,
                                        }}
                                        exitStyle={{
                                            opacity: 0,
                                        }}
                                        opacity={1}
                                    >
                                        <Text 
                                            color={isActive ? '$text' : '$tabDefaultText'} 
                                            fontSize={isActive ? 18 : 14} 
                                            fontWeight="bold" 
                                            textTransform="capitalize" 
                                            textAlign="left"
                                            opacity={isActive ? 1 : 0.6}
                                        >
                                            {tab}
                                        </Text>
                                    </View>
                                </AnimatePresence>
                            </Tabs.Tab>
                        )
                    })
                }
            </Tabs.List>
        </Tabs>
    )
}


