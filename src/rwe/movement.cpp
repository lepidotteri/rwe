#include "movement.h"

namespace rwe
{
    bool
    isGridPointWalkable(const MapTerrain& terrain, const MovementClass& movementClass, unsigned int x, unsigned int y)
    {
        if (isMaxSlopeGreaterThan(terrain.getHeightMap(), terrain.getSeaLevel(), x, y, movementClass.footprintX, movementClass.footprintZ, movementClass.maxSlope, movementClass.maxWaterSlope))
        {
            return false;
        }

        if (!isWaterDepthWithinBounds(terrain.getHeightMap(), terrain.getSeaLevel(), x, y, movementClass.footprintX, movementClass.footprintZ, movementClass.minWaterDepth, movementClass.maxWaterDepth))
        {
            return false;
        }

        return true;
    }

    bool isMaxSlopeGreaterThan(const Grid<unsigned char>& heights, unsigned int waterLevel, unsigned int x, unsigned int y, unsigned int width, unsigned int height, unsigned int maxSlope, unsigned int maxWaterSlope)
    {
        auto isUnderWater = isAreaUnderWater(heights, waterLevel, x, y, width, height);
        auto effectiveMaxSlope = isUnderWater ? maxWaterSlope : maxSlope;

        for (unsigned int dy = 0; dy < height; ++dy)
        {
            for (unsigned int dx = 0; dx < width; ++dx)
            {
                if (getSlope(heights, x + dx, y + dy) > effectiveMaxSlope)
                {
                    return true;
                }
            }
        }

        return false;
    }

    bool
    isWaterDepthWithinBounds(const Grid<unsigned char>& heights, unsigned int waterLevel, unsigned int x, unsigned int y, unsigned int width, unsigned int height, unsigned int minWaterDepth, unsigned int maxWaterDepth)
    {
        for (unsigned int dy = 0; dy < height; ++dy)
        {
            for (unsigned int dx = 0; dx < width; ++dx)
            {
                auto cellWaterDepth = getWaterDepth(heights, waterLevel, x + dx, y + dy);
                if (cellWaterDepth < minWaterDepth)
                {
                    return false;
                }

                if (cellWaterDepth > maxWaterDepth)
                {
                    return false;
                }
            }
        }

        return true;
    }

    unsigned int
    getWaterDepth(const Grid<unsigned char>& heights, unsigned int waterLevel, unsigned int x, unsigned int y)
    {
        auto height = heights.get(x, y);
        return height < waterLevel ? waterLevel - height : 0;
    }

    unsigned int getSlope(const Grid<unsigned char>& heights, unsigned int x, unsigned int y)
    {
        unsigned int minHeight = 255;
        unsigned int maxHeight = 0;

        for (unsigned int dy = 0; dy < 2; ++dy)
        {
            for (unsigned int dx = 0; dx < 2; ++dx)
            {
                auto cellHeight = heights.get(x + dx, y + dy);

                if (cellHeight < minHeight)
                {
                    minHeight = cellHeight;
                }

                if (cellHeight > maxHeight)
                {
                    maxHeight = cellHeight;
                }
            }
        }

        auto slope = maxHeight - minHeight;
        return slope;
    }

    bool isAreaUnderWater(
        const Grid<unsigned char>& heights,
        unsigned int waterLevel,
        unsigned int x,
        unsigned int y,
        unsigned int width,
        unsigned int height)
    {
        for (unsigned int dy = 0; dy < height + 1; ++dy)
        {
            for (unsigned int dx = 0; dx < width + 1; ++dx)
            {
                auto cellHeight = heights.get(x + dx, y + dy);
                if (cellHeight < waterLevel)
                {
                    return true;
                }
            }
        }

        return false;
    }
}
