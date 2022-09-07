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
}

export default function UserList({ questions, onDrop, ...rest }: Props) {
    return (
        <FlatList<Question> style={{width: '100%'}} data={questions}
            renderItem={({ item: question }) => <UserItem dropZoneHeight={1000} id={question.id} question={question} onDrop={onDrop} key={question.id} {...rest} />}
        />);
}