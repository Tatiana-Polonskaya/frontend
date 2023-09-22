import { useEffect, useMemo, useRef, useState } from "react";
import AnalysisReport from "../../components/Report";
import MainLayout from "../../layouts/MainLayout";

import { useAppSelector } from "../../hooks/redux";

import "./style.scss";
import { cn } from "@bem-react/classname";

export default function LearningPage() {
    const cnLearning = cn("LearningPage");

    return <MainLayout></MainLayout>;
}
