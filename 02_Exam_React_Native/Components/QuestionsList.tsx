import React, { useMemo } from "react";
import { FlatList } from "react-native";
import { Question } from "../model/Question";
import { QuestionListener } from "../model/shared-types";
import UserItem from "./QuestionItem";

interface Props {
    questions: Question[];
    onUpdate: QuestionListener;
    onDelete: QuestionListener;
    onEdit: QuestionListener;
    onDrop: any;
    onUp: (num: number) => void;
    onDown: (num: number) => void;
}

export default function UserList({ questions, onDrop, onUp, onDown, ...rest }: Props) {
    return (
        <FlatList<Question> style={{width: '100%'}} data={questions}
            renderItem={({ item: question }) => <UserItem onUp={() => onUp(question.id!)} onDown={() => onDown(question.id!)} dropZoneHeight={1000} id={question.id} question={question} onDrop={onDrop} key={question.id} {...rest} />}
        />);
}