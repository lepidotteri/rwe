#pragma once

#include <rwe/DiscreteRect.h>
#include <rwe/UnitId.h>
#include <rwe/math/Vector3f.h>
#include <variant>

namespace rwe
{
    struct MoveOrder
    {
        Vector3f destination;
        explicit MoveOrder(const Vector3f& destination) : destination(destination) {}
    };

    using AttackTarget = std::variant<UnitId, Vector3f>;

    struct AttackOrder
    {
        AttackTarget target;
        explicit AttackOrder(UnitId target) : target(target) {}
        explicit AttackOrder(const Vector3f& target) : target(target) {}
    };

    struct BuildOrder
    {
        std::string unitType;
        Vector3f position;
        BuildOrder(const std::string& unitType, const Vector3f& position) : unitType(unitType), position(position) {}
    };

    struct BuggerOffOrder
    {
        DiscreteRect rect;
        explicit BuggerOffOrder(const DiscreteRect& r) : rect(r) {}
    };

    using UnitOrder = std::variant<MoveOrder, AttackOrder, BuildOrder, BuggerOffOrder>;
}
