#pragma once

#include <rwe/AudioService.h>
#include <rwe/GameTime.h>
#include <rwe/SpriteSeries.h>
#include <rwe/UnitId.h>
#include <rwe/cob/CobThread.h>
#include <rwe/math/Vector3f.h>
#include <variant>

namespace rwe
{
    struct UnitWeaponStateIdle
    {
    };

    using UnitWeaponAttackTarget = std::variant<UnitId, Vector3f>;

    struct UnitWeaponStateAttacking
    {
        struct AimInfo
        {
            const CobThread* thread;
            float lastHeading;
            float lastPitch;
        };

        /** The target the weapon is currently trying to shoot at. */
        UnitWeaponAttackTarget target;

        std::optional<AimInfo> aimInfo;

        UnitWeaponStateAttacking(const UnitWeaponAttackTarget& target) : target(target)
        {
        }
    };

    using UnitWeaponState = std::variant<UnitWeaponStateIdle, UnitWeaponStateAttacking>;

    struct UnitWeapon
    {
        float maxRange;

        float reloadTime;

        bool startSmoke;
        bool endSmoke;

        std::optional<GameTime> smokeTrail;

        std::optional<AudioService::SoundHandle> soundStart;
        std::optional<AudioService::SoundHandle> soundHit;
        std::optional<AudioService::SoundHandle> soundWater;

        std::optional<std::shared_ptr<SpriteSeries>> explosion;
        std::optional<std::shared_ptr<SpriteSeries>> waterExplosion;

        /** The game time at which the weapon next becomes ready to fire. */
        GameTime readyTime{0};

        float tolerance;

        float pitchTolerance;

        Vector3f color;
        Vector3f color2;

        /** Projectile velocity in pixels/tick. */
        float velocity;

        /** Beam duration in ticks. */
        float duration;

        /** If true, the weapon only fires on command and does not auto-target. */
        bool commandFire;

        std::unordered_map<std::string, unsigned int> damage;

        float damageRadius;

        /** The internal state of the weapon. */
        UnitWeaponState state{UnitWeaponStateIdle()};
    };
}
