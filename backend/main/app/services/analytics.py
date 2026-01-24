from collections import defaultdict

def analyze_session_performance(mcq_attempt):
    total = mcq_attempt.total_questions
    correct = 0
    wrong_questions = []

    for q in mcq_attempt.questions:
        if q.is_correct:
            correct += 1
        else:
            wrong_questions.append({
                "question": q.question,
                "user_answer": q.user_answer,
                "correct_answer": q.correct_answer
            })

    accuracy = round((correct / total) * 100, 2)

    return {
        "total": total,
        "correct": correct,
        "wrong": total - correct,
        "accuracy": accuracy,
        "wrong_questions": wrong_questions
    }


def extract_weak_topics(wrong_questions, chunks):
    weak_chunks = []

    for chunk in chunks:
        for q in wrong_questions:
            if q["question"].lower() in chunk.content.lower():
                weak_chunks.append(chunk.content)
                break

    return weak_chunks[:3]  