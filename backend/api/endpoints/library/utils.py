def valid_module_code(module_code: str):
    if not module_code:
        return False

    if len(module_code) != 7:
        return False

    return True


def valid_assessment_id(assessment_id: str):
    if not assessment_id:
        return False

    if not assessment_id.upper()[0] == "A":
        return False

    return True


def valid_subcomponent_id(subcomponent_id: str):
    if not subcomponent_id:
        return False

    if not subcomponent_id.upper()[0] == "S":
        return False

    return True
