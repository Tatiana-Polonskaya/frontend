import { useEffect } from "react";
import AnalysisReport from "../../components/Report";
import MainLayout from "../../layouts/MainLayout";
import { useGetSSEConnectionQuery } from "../../store/api/chat";

export default function LearningPage() {
    const resultSSEConnection = useGetSSEConnectionQuery();
    useEffect(()=>{
        if(resultSSEConnection) {
            console.log(resultSSEConnection)
        }
    },[resultSSEConnection])
    
    return (
        <MainLayout>
            
        </MainLayout>
    );
}
